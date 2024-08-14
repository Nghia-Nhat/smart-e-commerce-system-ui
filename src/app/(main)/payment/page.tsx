'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

interface PaymentData {
  amount: number;
  description: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}

const OrderInformation: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const paymentData: PaymentData = {
      amount: 2000,
      description: "Thanh toan don hang",
      items: [
        {
          name: "Allen Solly Kids Girls Poplin Pink Shorts",
          quantity: 1,
          price: 2000,
        },
      ],
    };

    try {
      const response = await fetch('http://localhost:5000/payment/create-payment-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      window.location.href = data.checkoutUrl;
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error creating the payment link');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="main-box">
      <div className="checkout">
        <div className="product">
          <p><strong>Tên sản phẩm:</strong> Allen Solly Kids Girls Poplin Pink Shorts</p>
          <p><strong>Giá tiền:</strong> 2000 VNĐ</p>
          <p><strong>Số lượng:</strong> 1</p>
        </div>
        <form onSubmit={handleSubmit}>
          <button type="submit" id="create-payment-link-btn" disabled={isLoading}>
            {isLoading ? 'Đang tạo...' : 'Tạo Link thanh toán'}
          </button>
        </form>
      </div>
    </div>
  );
};

interface CheckoutMessageProps {
  message: string;
}

const CheckoutMessage: React.FC<CheckoutMessageProps> = ({ message }) => (
  <div className="main-box">
    <div className="checkout">
      <div className="product">
        <p>{message}</p>
      </div>
      <form action="/">
        <button type="submit" id="create-payment-link-btn">
          Quay lại trang thanh toán
        </button>
      </form>
    </div>
  </div>
);

const Payment: React.FC = () => {
    const [message, setMessage] = useState<string>("");
    const searchParams = useSearchParams();
  
    useEffect(() => {
      const success = searchParams.get('success');
      const canceled = searchParams.get('canceled');
      
      if (success) {
        setMessage("Thanh toán thành công. Cảm ơn bạn đã sử dụng payOS!");
      }
      if (canceled) {
        setMessage(
          "Thanh toán thất bại. Nếu có bất kỳ câu hỏi nào hãy gửi email tới support@payos.vn."
        );
      }
    }, [searchParams]);

  return message ? (
    <CheckoutMessage message={message} />
  ) : (
    <OrderInformation />
  );
};

export default Payment;