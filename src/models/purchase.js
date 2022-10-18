
export default class Purchase {
    constructor(id, userId, courseId, title, price, purchaseTime) {
        this.id = id;
        this.userId = userId;
        this.courseId = courseId;
        this.title = title;
        this.price = price;
        this.purchaseTime = purchaseTime;
    }
}