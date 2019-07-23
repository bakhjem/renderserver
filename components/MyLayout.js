import Header from './Header';
import Footer from './Footer';

const layoutStyle = {
 margin: 20,
 padding: 20,
 border: '1px solid #DDD'
}

export default (props) => (
 <div>
   <Header />
   {props.children}
   <Footer />
 </div>
)