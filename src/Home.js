import { useState } from "react";
import BlogList from "./BlogList";
const Home = () => {
  

  const [blogs, setBlogs] = useState([
    {title: 'my new website', body: 'lorem ipsum', author: 'mario', id: 1},
    {title: 'welcome party', body: 'lorem ipsum', author: 'yoshi', id: 2},
    {title: 'web dev', body: 'lorem ipsum', author: 'mario', id: 3},
  ]);
  return ( 
    <div className="home">
      <BlogList blogs={blogs} title="All blogs!"></BlogList>
      <BlogList blogs={blogs.filter(blog => blog.author === 'mario')} title="Mario's blogs!"></BlogList>
    </div>
  );
}
 
export default Home;