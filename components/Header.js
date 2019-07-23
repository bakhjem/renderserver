import Link from 'next/link'
import React, { Component } from "react";
// import "antd/dist/antd.css";
import '../Css/style.css';
import Router from 'next/router'

const linkStyle = {
 marginRight: 15
}

class Header extends Component {
    constructor(props) {
      super(props);
      this.state = {
        q: '',
        a: '',
        s:''
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event){
      this.setState({q: event.target.value});
    }
    handleSubmit(){
      // console.log(112);
      this.setState({a:'1'})
    }
    change_alias = (alias) => {
      var str = alias;
      str = str.toLowerCase();
      str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
      str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
      str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
      str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
      str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
      str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
      str = str.replace(/đ/g,"d");
      str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
      str = str.replace(/ + /g," ");
      str = str.trim(); 
      return str;
    }
  componentDidUpdate(prevProps, prevState) {
    if(this.state.q !== prevState.q){
      
      this.setState({
        s: this.change_alias(this.state.q).split(' ').join('_')
      })
    }
  }
  
    
    render() {
      // console.log(this.state)
      return (
        <div>
          {this.state.a === '1' && Router.push('/search/'+this.state.s+'/page/1')}
          <div id="header">
            <div className="top_header" style={{width:'100%',}}>
              <Link
                
                href="/"
              >
                  <a title="Đọc truyện online" id="logo"
                className="logo">
                YYTRUYEN
                </a>
                {/* <img style={{width:'330',height:99}} src={require('./V2.jpg')}></img> */}
              </Link>
            </div>
            <div className="wrap-menu">
              <form onSubmit={this.handleSubmit} style={{color:'black'}}>
                <input
                  id="search_story"
                  type='text'
                  placeholder="Tìm kiếm  ..."
                  value={this.state.q}
                  onChange={this.handleChange}
                />
                {/* <div style={{ display: "none" }}>
                  <input />
                </div> */}
              </form>
              <ul id="menu" className="menu">
                <li>
                  <Link href="/">
                      <a title="Novel online">
                    Đọc truyện online
                    </a>
                  </Link>
                </li>
                <li>
                  <Link
                  as={`/hot/page/1`}
                    href={'/hot?page=1'} 
                  >
                      <a title="Truyện hot">
                    Truyện hot
                    </a>
                  </Link>
                </li>
                <li>
                  <Link
                  as={`/complete/page/1`}
                    href={'/complete?page=1'}
                  >
                    <a title="Truyện hoàn thành">
                    Truyện hoàn thành
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    }
  }
  
  export default Header;