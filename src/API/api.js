import request from "@/API/request";
export function phpAPI(data) {
    return request({
        url: 'test.php',
        method: 'post',
        data
    })
}