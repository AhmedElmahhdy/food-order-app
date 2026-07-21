export class PasswordReset {
    id: number;
    userId: number;
    otpHash: string;
    expireAt: Date;
    consumedAt: Date;
    createdAt: Date;


    constructor(data:  Partial <PasswordReset>) {
        this.id = data.id!;
        this.userId = data.userId!;
        this.otpHash = data.otpHash!;
        this.expireAt = data.expireAt!;
        this.consumedAt = data.consumedAt!
        this.createdAt = data.createdAt?? new Date();
    }

    isExpired():boolean{
        return this.expireAt < new Date();
    }


}