export const policyCenter: string = 'http://localhost:8180/pc/PolicyCenter.do';
export const billingCenter: string = "http://localhost:8580/bc/BillingCenter.do";

export const user: {[key: string]: string | undefined} = {
    username : process.env.USER,
    password : process.env.PASS,
};
