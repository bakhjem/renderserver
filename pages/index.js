import Layout from '../components/MyLayout'
import 'isomorphic-unfetch'
import Link from 'next/link'
import React from 'react'
import { Icon,Skeleton } from 'antd';
import "antd/dist/antd.css";
import '../Css/style.css';
import { Helmet } from 'react-helmet';

export default class Index extends React.Component {
  static async getInitialProps() {
    // eslint-disable-next-line no-undef
    const res = await fetch('http://3.1.203.88:8001/update?page=1')
    const json = await res.json()
    // console.log(json.data)
    return { mangalist: json.data }
  }

  render() {
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
            <div className="cotgiua_menu">
              <Link
                as={`/update/page/1`}
                href={'/update?page=1'}
              >
                <a title="Truyện mới cập nhật"
                rel="nofollow"
                className="head_title actived muc_truyen_moi_cap_nhat">
                Truyện mới
                </a>
            </Link>
              {/* <Link
              rel="nofollow"
              to={'/completed/page/1'}
              title="COMPLETED NOVEL"
              className="head_title muc_truyen_hoan_thanh"
            >
              COMPLETED
            </Link> */}
              {/* <Link
              rel="nofollow"
              to={'/newnovel/page/1'}
              title="NEWEST NOVEL"
              className="head_title"
            >
              NEWEST
            </Link> */}
              <Link
                as={`/hot/page/1`}
                href={'/hot?page=1'}
                
              >
                <a title="TOP VIEW NOVEL"
                rel="nofollow"
                className="head_title">
                Truyện hot
                </a>
            </Link>
            </div>
            <div className="wrap_update home">
              <div className="daily-update">
                <h2 className="title update-title" title="Recently Updated MANGA">
                  Mới cập nhật
              </h2>
              </div>
              {this.props.mangalist.length !== 0 ?
                this.props.mangalist.map(mangalist => (
                  <div className="update_item">
                    <div className="update_image">
                      <Link
                        
                        as={`/truyen/${mangalist.idnovel}`} href={`/truyen?id=${mangalist.idnovel}`}
                        // href={'/truyen/' + mangalist.idnovel}
                      ><a className="tooltip">
                        <img
                          src={mangalist.cover}
                          alt={mangalist.novelsname}
                        />
                        </a>
                      </Link>
                    </div>
                    <div className="nowrap">
                      <Link
                        as={`/truyen/${mangalist.idnovel}`} href={`/truyen?id=${mangalist.idnovel}`}
                        
                      >
                        <a className="tooltip" title={mangalist.novelsname}>
                        {mangalist.novelsname}
                        </a>
                      </Link>
                      {/* <em>43 minutes ago </em> */}
                    </div>
                    <Link
                      // to={'/novel/' + mangalist.idnovel + '/' + mangalist.idchapter}
                      as={`/doc/${mangalist.idnovel}/chapter/${mangalist.idchapter}`} href={`/doc?id=${mangalist.idnovel}&chapter=${mangalist.idchapter}`}
                      
                    >
                      <a title={mangalist.lasterchapter}
                      className="chapter">
                      {mangalist.lasterchapter}
                      </a>
                    </Link>
                    <br />
                    <span style={{ color: '#6f6f6f', fontSize: 13 }}><Icon type="eye" /> {mangalist.view}
                    </span>
                    <p>{mangalist.des}</p>
                  </div>
                )) : <Skeleton active avatar></Skeleton>}
              <Link as={'/update/page/1'} href={`/update?page=1`} ><a title="More" className="xemthem" rel="nofollow">Xem thêm</a></Link>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}


// Index.getInitialProps = async function () {
//   const res = await fetch('http://3.1.203.88:8001/update?page=1')
//   const data = await res.json()
//   console.log(data.data)
//   // console.log(`Show data fetched. Count: ${data.length}`)

//   return {
//     novel: data.data
//   }
// }
// export default Index