export const paystack = {
    async initializeTransaction(email: string, amount: number, metadata: any) {
        const res = await fetch("https://api.paystack.co/transaction/initialize", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                amount: Math.round(amount * 100), // Kobo for NGN, or localized currency units
                callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/buy/success`,
                metadata,
            }),
        });
        return await res.json();
    },

    async verifyTransaction(reference: string) {
        const res = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            },
        });
        return await res.json();
    }
};
