import Client from "@elastic/elasticsearch/lib/client";
import config from "config";

export const elasticClient = new Client({
    cloud: {id:config.get("elasticSearch.cloudId")},
    auth: {
        username: config.get("elasticSearch.username"),
        password: config.get("elasticSearch.password")
    }
});


