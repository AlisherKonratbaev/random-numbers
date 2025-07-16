import {Flex, Layout} from "antd";
import './style.css'

import Numbers from "./components/Numbers.tsx";

const {Header, Content} = Layout;


function App() {
    return (
        <Flex gap="middle" wrap>
            <Layout className='layout'>
                <Header className='header'>Header</Header>
                <Content className='content'><Numbers/></Content>
            </Layout>
        </Flex>
    )
}


export default App
