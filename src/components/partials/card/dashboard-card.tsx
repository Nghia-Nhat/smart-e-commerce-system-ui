import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSignIcon, Eye, ShoppingBag, User2 } from "lucide-react";

type CardProps = {
  productViewed: any;
  productAddToCart: any;
  totalRevenue: any;
  totalUser: any;
};

function DashboardCard({ cardData }: { cardData: CardProps }) {
    const productViewed = cardData?.productViewed
    const productAddedToCart = cardData?.productAddToCart
    const totalRevenue = cardData?.totalRevenue
    const totalUser = cardData?.totalUser

    const renderStatus = (object: any) => {
        if (object?.changeInfo.status === "increase") {
            return <span className="text-green-500">+{object?.changeInfo.percentageChange}%</span>
        } else if (object?.changeInfo.status === "decrease") {
            return <span className="text-red-500">-{object?.changeInfo.percentageChange}%</span>
        } else {
            return "No data to compare"
        }
    }
    return (
    <>
      <div className="h-32 w-full">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total View</CardTitle>
            <Eye className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{productViewed?.totalCurrent}</div>
            <p className="text-xs text-muted-foreground">
              {renderStatus(productViewed)} from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="h-32 w-full">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total products in Cart</CardTitle>
            <ShoppingBag className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{productAddedToCart?.totalCurrent}</div>
            <p className="text-xs text-muted-foreground">
              {renderStatus(productAddedToCart)} from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="h-32 w-full">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSignIcon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRevenue?.totalCurrent ? "$" : ""}{totalRevenue?.totalCurrent}</div>
            <p className="text-xs text-muted-foreground">
              {renderStatus(totalRevenue)} from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="h-32 w-full">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total new users</CardTitle>
            <User2 className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUser?.totalCurrent}</div>
            <p className="text-xs text-muted-foreground">
              {renderStatus(totalUser)} from last month
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default DashboardCard;
