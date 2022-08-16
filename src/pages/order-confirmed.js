import React, { useEffect, useState } from "react"
import OrderCompletedItem from "../components/orders/order-completed-item"
import OrderTotal from "../components/orders/order-total"
import SearchEngineOptimization from "../components/utility/seo"
import { StaticImage } from "gatsby-plugin-image"

const OrderConfirmed = ({ location }) => {
  const [order, setOrder] = useState(undefined)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState(
    "Hang on, while we process your order."
  )

  useEffect(() => {
    const getOrder = async () => {
      const state = location.state
      const stateOrder = state?.order

      if (stateOrder) {
        setOrder(stateOrder)
      }
      setLoading(false)
    }

    getOrder()
  }, [location.state])

  useEffect(() => {
    const onNoOrder = () => {
      if (!order && !loading) {
        setMessage(
          "We couldn't find your order, it might have gone through but we can't seem to find it at the moment. Please check your email for an order confirmation."
        )
      }
    }

    const checkForOrder = setTimeout(onNoOrder, 5000)

    return () => clearTimeout(checkForOrder)
  }, [order, loading])

  return !loading && order ? (
    <div className="layout-base flex justify-center pb-16">
      <SearchEngineOptimization title="Order Confirmed" />
      <div className="max-w-xl">
        <span className="text-xs font-medium mb-2">OBRIGADO</span>
        <StaticImage
            src="../images/WHS_horizontal-verde.png"
     
       
          />
        <h1>A sua encomenda esta confirmada</h1>
        <p className="text-md font-light mt-3">
          A sua encomenda #{order.display_id} foi processada corretamente. Irá receber um email com o estado e nº de tracking da sua encomenda, assim que seja enviada.
        </p>
        <div className="my-8">
          {order.items.map((item, index) => {
            return (
              <OrderCompletedItem
                key={index}
                item={item}
                currencyCode={order.currency_code}
              />
            )
          })}
        </div>
        <OrderTotal order={order} />
      </div>
    </div>
  ) : (
    <div className="h-screen flex items-center justify-center px-6">
      <p>{message}</p>
    </div>
  )
}

export default OrderConfirmed
