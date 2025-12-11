export default class DDNetUtils {
    static async playerHours(seconds) {
        return Math.floor((seconds / 60) / 60);
    }
}