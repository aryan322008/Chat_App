import { connect } from 'mongoose';

const main = async () => {
    await connect('mongodb://127.0.0.1:27017/chat');
}

export default main ;
