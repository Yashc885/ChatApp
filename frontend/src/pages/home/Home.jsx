import MessageContainer from "../../components/messsages/MessageContainer.jsx";
import Sidebar from "../../components/sidebar/Sidebar";

const Home = () => {
	return (
		<div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-800 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10'>
			<Sidebar />
			<MessageContainer />
		</div>
	);
};
export default Home;