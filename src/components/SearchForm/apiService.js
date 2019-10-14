import axios from "axios";
import PNotify from "../node_modules/pnotify/dist/es/PNotify.js";
import PNotifyButtons from "../node_modules/pnotify/dist/es/PNotifyButtons.js";

export default {
    api_key: process.env.API_KEY,
    key: "13619613-d1f8f7df7dae9803108c4d3bd",
    page: 1,
    word: "",

    async getPics() {
        const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.word}&page=${this.page}&per_page=12&key=${this.key}`;

        try {
            const pics = await axios.get(url);
            return pics.data;
        } catch (err) {
            PNotify.info({
                title: "Request failed",
                text: "Try again"
            });
            console.log(err);
        }
    },

    async returnData() {
        const pics = await this.getPics();

        return pics.hits.map(pic => {
            return {
                webformatURL: pic.webformatURL,
                largeImageURL: pic.largeImageURL,
                likes: pic.likes,
                views: pic.views,
                comments: pic.comments,
                downloads: pic.downloads
            };
        });
    },

    nextPage() {
        this.page += 1;
    },

    changeWord(word) {
        this.word = word;
        this.page = 1;
    }
};
