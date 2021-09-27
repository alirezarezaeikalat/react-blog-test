import BlogList from "./BlogList";
import useFetch from "./useFetch";
const Home = () => {
  
  const {data, error, isPending} = useFetch("http://localhost:8000/blogs");
  
  return ( 
    <div className="home">
      {error && <div>{ error }</div>}
      {isPending && <div>Loading...</div>}
      {data && <BlogList blogs={data} title="All blogs!"></BlogList>}
    </div>
  );
}
 
export default Home;