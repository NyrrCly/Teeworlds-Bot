export default class DDnetUtils {
    static async playerHours(seconds) {
        return Math.floor((seconds / 60) / 60);
    }
}