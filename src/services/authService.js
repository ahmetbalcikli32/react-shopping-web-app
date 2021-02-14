import axios from "axios";

const API_URL = "/api/auth";

class AuthService {
    login = body => {
        return axios
            .post(API_URL, {
                body
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    signup = body => {
        return axios.post(API_URL, {
            body
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();