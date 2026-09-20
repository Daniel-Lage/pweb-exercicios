export type ProductObject = {
  id: number;
} & ProductPayload;

export type ProductPayload = {
  name: string;
  price: number;
};
