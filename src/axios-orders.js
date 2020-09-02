import axios from 'axios';

const instance = axios.create({

    baseURL : "https://react-my-burger-dc22e.firebaseio.com/"

});

export default instance;