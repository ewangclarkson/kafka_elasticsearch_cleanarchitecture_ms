import Client from "@elastic/elasticsearch/lib/client";
import config from "config";

//singleton design pattern
export default class ElasticSearchClientManager {

    private readonly elasticClient: Client;
    private static instance: ElasticSearchClientManager;

    constructor() {
        this.elasticClient = new Client({
            cloud: {id: config.get("elasticSearch.cloudId")},
            auth: {
                username: config.get("elasticSearch.username"),
                password: config.get("elasticSearch.password")
            }
        });
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new ElasticSearchClientManager();
        }
        return this.instance;
    }

    getElasticClient() {
        return this.elasticClient;
    }

}

