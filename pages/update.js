import Layout from '../components/MyLayout'
import 'isomorphic-unfetch'
import Link from 'next/link'
import React from 'react'
import { Icon, Skeleton, Tag } from 'antd';
import "antd/dist/antd.css";
import '../Css/style.css';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { Helmet } from 'react-helmet';

export default class Update extends React.Component {
    static async getInitialProps(context) {
        // eslint-disable-next-line no-undef
        const { page } = context.query
        const res = await fetch(`http://3.1.203.88:8001/update?page=${page}`)
        const json = await res.json()
        // console.log(json)
        return { data: json, page: page }
    }

    render() {
        console.log(this.props)
        return (
            <Layout>
                <Helmet>
                    <title>Đọc truyện online - YYtruyen.com</title>
                    <meta name="description" content="Đọc truyện miễn phí, cập nhật nhanh nhất các truyện ngôn tình, truyện kiếm hiệp, xuyên không, sủng, ngược và nhiều thể loại khác" />
                    <meta name="theme-color" content="#008f68" />
                    <meta name="keywords" content="đọc truyện, đọc truyện online, truyện ngôn tình, truyện kiếm hiệp, xuyên không" />
                </Helmet>
                <div id="main_body">
                    <div className="cotgiua">
                        <div className="breadcrumb breadcrumbs">
                            <div className="rdfa-breadcrumb">
                                <div>
                                    <p>
                                        <span className="breadcrumbs-title" />
                                        <span
                                            itemScope
                                            itemType="http://data-vocabulary.org/Breadcrumb"
                                        >
                                            <Link href="/">
                                                <a
                                                    itemProp="url"
                                                    className="home"
                                                    title="Đọc truyện online"
                                                >
                                                    <span itemProp="title">Đọc truyện online</span>
                                                </a>
                                            </Link>
                                        </span>
                                        <span className="separator">»</span>
                                        <span
                                            itemScope
                                            itemType="http://data-vocabulary.org/Breadcrumb"
                                        >
                                            <Link
                                                itemProp="url"
                                                as={`/update/page/${this.props.data.page}`}
                                                href={`/update?page=${this.props.data.page}`}
                                            >
                                                <span itemProp="title">Latest</span>
                                            </Link>
                                        </span>
                                        <span className="separator">»</span>{this.props.data.page} page
              </p>
                                </div>
                            </div>
                        </div>
                        <div className="wrap_update tab_anh_dep danh_sach" style={{ marginBottom: 10 }}>
                            {this.props.data.data.length !== 0 ?
                                this.props.data.data.map(data => (
                                    <div className="update_item list_category" title={data.novelsname}>
                                        <Link as={`/truyen/${data.idnovel}`} href={`/truyen?id=${data.idnovel}`}>
                                            <a rel="nofollow" title={data.novelsname}>
                                                <img src={data.cover} alt={data.novelsname} title={data.novelsname} />
                                            </a>
                                        </Link>
                                        <h3 className="nowrap">
                                            <Link as={`/truyen/${data.idnovel}`} href={`/truyen?id=${data.idnovel}`}  >
                                                <a title={data.novelsname}>
                                                    {data.novelsname}
                                                </a>
                                            </Link>
                                        </h3>
                                        <Link as={`/doc/${data.idnovel}/chapter/${data.idchapter}`} href={`/doc?id=${data.idnovel}&chapter=${data.idchapter}`}>
                                            <a title={data.lasterchapter} className="chapter">
                                                {data.lasterchapter}
                                            </a>
                                        </Link>
                                        <span><Icon type="eye" /> {data.view}</span>
                                        <p>{data.des}</p>
                                    </div>
                                )) : <Skeleton active></Skeleton>
                            }
                            {/* <div className="clearfix"></div> */}
                        </div>
                        <div className="phan-trang">
                            {this.props.page !== (this.props.data.totalpage).toString() &&
                            <Link as={`/update/page/${(parseInt(this.props.page) + 1)}`} href={`/update?page=${(parseInt(this.props.page) + 1)}`}>
                                <a className="quantitychapter">Trang sau</a>
                                </Link>
                            }
                            {this.props.page !== '1' &&
                            <Link as={`/update/page/${(parseInt(this.props.page) - 1)}`} href={`/update?page=${(parseInt(this.props.page) - 1)}`}>
                                <a className="page">Trang trước</a>
                                </Link>
                            }
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}
