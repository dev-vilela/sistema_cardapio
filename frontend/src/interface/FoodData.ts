export interface FoodData {
    id: number,
    title: string,
    image:string,
    price: number
}

export type FoodDataCreate = Omit<FoodData, "id">;