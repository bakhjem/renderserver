import Layout from '../components/MyLayout'
import 'isomorphic-unfetch'
import Link from 'next/link'
import React from 'react'
import { Icon, Skeleton, Tag } from 'antd';
import "antd/dist/antd.css";
import '../Css/style.css';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { Helmet } from 'react-helmet';

export default class Truyen extends React.Component {
    static async getInitialProps({ query: { id } }) {
        // eslint-disable-next-line no-undef
        // const { id } = context.query
        const res = await fetch(`http://3.1.203.88:8001/novel?id=${id}`)
        const json = await res.json()
        // console.log(json)
        return { data: json }
    }

    render() {
        console.log(this.props)
        return (
            <Layout>
                <Helmet>
                    <title>{`${this.props.data.novelsname}`} - YYtruyen</title>
                    <meta name="description" content={`Truyện ${this.props.data.novelsname} là tác phẩm của tác giả ${this.props.data.author}, tiến trình: ${this.props.data.status}. Vào yytruyen.com để đọc những chương mới nhất của tác phẩm này nhé  `} />
                    <meta name="theme-color" content="#008f68" />
                    <meta name="keywords" content="đọc truyện online, truyện online, truyện ngôn tình, truyện kiếm hiệp, truyện ngược, sủng" />
                    <meta property="og:title" content={`${this.props.data.novelsname}`} />
                    <meta property="og:type" content="book" />
                    <meta property="og:image" content={`${this.props.data.cover}`} />
                    <meta property="og:description" content={`${this.props.data.des}`} />
                    <meta property="og:site_name" content="Yytruyen.com" />
                    <meta property="og:url" content={`http://yytruyen.com/truyen/${this.props.data.idnovels}`} />
                    <meta property="book:author" content={`${this.props.data.author}`} /> 

                    <script type="application/ld+json">{`
                    {
                    "@context": "http://schema.org",
                    "url": "http://yytruyen.com/truyen/${this.props.data.idnovels}",
                    "image": "${this.props.data.cover}",
                    "@type": "Book",
                    "name": "${this.props.data.novelsname}",
                    "author": "${this.props.data.author}",
                    "description": "${this.props.data.des}"
                    }
                    `}</script>
                </Helmet>
                <div id="main_body">
                    <div className="cotgiua">
                        <div className="hfeed truyen_info_wrapper">
                            <div className="breadcrumb breadcrumbs">
                                <div className="rdfa-breadcrumb">
                                    <div>
                                        <p>
                                            <span className="breadcrumbs-title" />
                                            <span
                                                itemScope
                                                itemType="http://data-vocabulary.org/Breadcrumb"
                                            >
                                                <Link
                                                    href="/"
                                                >
                                                    <a itemProp="url" className="home"
                                                        title="Đọc truyện online">
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
                                                    as={`/truyen/${this.props.data.idnovels}`}
                                                    href={`/truyen?id=${this.props.data.idnovels}`}

                                                >
                                                    <a itemProp="url" title={this.props.data.novelsname}>
                                                        <span itemProp="title">
                                                            {this.props.data.novelsname}
                                                        </span>
                                                    </a>
                                                </Link>
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {this.props.data.chapterlist.length !== 0 ?
                                <div className="hentry truyen_info">
                                    <div className="entry-header">
                                        <div className="truyen_if_wrap">
                                            <div className="truyen_info_left">
                                                <span
                                                    className="info_image"
                                                    style={{
                                                        background: `url(${
                                                            this.props.data.cover
                                                            })  center center no-repeat`,
                                                        backgroundSize: "contain"
                                                    }}
                                                    title={this.props.data.novelsname}
                                                >
                                                    <img
                                                        width={173}
                                                        height={250}
                                                        src={this.props.data.cover}
                                                        className="attachment-large size-large wp-post-image"
                                                        alt={this.props.data.novelsname}
                                                        title={this.props.data.novelsname}
                                                        style={{ opacity: 0 }}
                                                    />
                                                </span>
                                                {/* <Link href={'#list_chapter'}>
                                                    <span
                                                        onClick="movetolistchapter();"
                                                        className="btn_theodoi btn_list_chapter"

                                                    >
                                                        Danh sách chương
                  </span>
                                                </Link> */}
                                            </div>
                                            <ul className="truyen_info_right">
                                                {/* <li> */}
                                                <h1 className="entry-title">
                                                    <span>{this.props.data.novelsname}</span>
                                                </h1>
                                                {/* <span
                      style={{
                        font: "400 14px Open Sans, Tahoma, Geneva, sans-serif"
                      }}
                    >
                      {this.state.view}
                    </span>{" "} */}
                                                {/* </li> */}
                                                <li></li>
                                                <li>
                                                    <span>Tác giả: </span>
                                                    {this.props.data.author}
                                                </li>
                                                <li>
                                                    <span>Thể loại: </span>
                                                    {this.props.data.genresdata.map(genresdata => (
                                                        <Tag color="#f50" style={{ margin: 2 }}>
                                                            <Link as={`/theloai/${genresdata.idgenres}/page/1`} href={`/theloai?id=${genresdata.idgenres}&page=1`}>
                                                                <a style={{ color: 'white' }} rel="nofollow">
                                                                    {genresdata.genrename}
                                                                </a>
                                                            </Link>
                                                        </Tag>
                                                    ))}
                                                </li>
                                                <li>
                                                    <span>Tình trạng : </span>
                                                    {this.props.data.status == 'Đang cập nhật' ? <Tag color="#f50" style={{ margin: 2 }}>{this.props.data.status}</Tag> : <Tag color="#ff0080" style={{ margin: 2 }}>{this.props.data.status}</Tag>}
                                                </li>
                                                <li>
                                                    <span>view : </span>
                                                    <em
                                                        className="entry-meta"
                                                        style={{ padding: 0, fontStyle: "initial" }}
                                                    >
                                                        <em className="date updated">
                                                            {this.props.data.view}
                                                        </em>
                                                    </em>
                                                </li>
                                            </ul>
                                        </div>
                                        <div
                                            id="noidungm"
                                            style={{
                                                font: "400 14px Open Sans, Tahoma, Geneva, sans-serif",
                                                color: "#3e3e3e",
                                                width: "100%",
                                                padding: "10px 2%",
                                                background: "#FFF",
                                                textAlign: "justify",
                                                borderTop: "1px dashed #ff530d",
                                                float: "left",
                                                height: "100%",
                                                position: "relative",
                                                overflowY: "auto",
                                                maxHeight: "100%",
                                                overflowX: "hidden"
                                            }}
                                        >
                                            <h2>
                                                {/* <p style={{ color: "red" }}>
                      {this.state.novelsname} summary:
                  </p> */}
                                            </h2>
                                            {ReactHtmlParser(this.props.data.description)}
                                            {/* {this.state.description} */}
                                        </div>
                                        <div style={{ width: "100%", textAlign: "center" }} />
                                        <div id="list_chapter" className="list_chapter">
                                            <div className="row title-list-chapter">
                                                <h2 className="h2-manga">
                                                    Danh sách chương
                  </h2>
                                            </div>
                                            <div className="chapter-list">
                                                {this.props.data.chapterlist.map(datachapter => (
                                                    <div className="row" key={datachapter.idchapter}>
                                                        <span><Link
                                                            as={`/doc/${this.props.data.idnovels}/chapter/${datachapter.idchapter}`}
                                                            href={`/doc?id=${this.props.data.idnovels}&chapter=${datachapter.idchapter}`}>
                                                            <a title={datachapter.chaptername}>{datachapter.chaptername}</a>
                                                        </Link></span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div> :
                                <div className="hentry truyen_info" style={{ background: 'white', float: 'left' }}>
                                    <Skeleton active avatar></Skeleton>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}
