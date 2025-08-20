import PaymentArtifact from "./PaymentProcessor.json";
export const PAYMENTS_ABI = PaymentArtifact.abi as any;
export const PAYMENTS_ADDRESS = process.env.NEXT_PUBLIC_PAYMENTS_ADDRESS!;