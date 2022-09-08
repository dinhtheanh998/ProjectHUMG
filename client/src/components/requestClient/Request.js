import React from "react";
import { NavLink } from "react-router-dom";
import ExchangeRequest from "./ExchangeRequest";
import ReturnRequest from "./ReturnRequest";

const Request = () => {
  return (
    <div className="max-w-[900px] mx-auto">
      <h3 className="mb-3 text-3xl font-bold uppercase">Chính sách đổi trả</h3>
      <div className="site-content page-chinh-sach-doi-tra site-content--main">
        <div className="container">
          <div className="text-base font-medium leading-8 page__content">
            <p>
              Thật khó chịu nếu phải làm công tác đổi/ trả cho đơn hàng vừa mua!
            </p>
            <p>
              Và cũng không mấy dễ chịu khi đọc những trang "Chính sách đổi trả"
              dài ngoằng và đủ thứ điều ràng buộc (thường là như thế).
            </p>
            <p>Do đó 9Eight sẽ viết ngắn gọn nhất có thể, cơ bản là:</p>
            <p>
              - Khách hàng <strong> được đổi hoặc trả</strong> sản phẩm
              <strong>trong vòng 3 ngày</strong> kể từ ngày nhận được sản phẩm.
            </p>
            <p>
              - Bất kỳ sản phẩm nào đặt mua tại 9Eight (sản phẩm được sale, sản
              phẩm đặt riêng theo yêu cầu và sản phẩm không về thêm hàng) được
              áp dụng chính sách này, kể cả sản phẩm đã giặt hay cắt mác. (Ai mà
              chịu được một chiếc áo quá rộng hay quần sịp quá chật chứ)
            </p>
            <p>
              - Trường hợp đổi,
              <strong>khách hàng sẽ chịu chi phí vận chuyển </strong>
              <strong>chỉ với 15.000 VNĐ</strong>
              <span>, và 9Eight sẽ</span>
              <strong>giao lại hàng miễn phí</strong>
              <span>cho Khách hàng.</span>
            </p>
            <p>
              - Trường hợp trả, <strong>9Eight sẽ hoàn lại tiền hàng</strong>
              (không bao gồm tiền phí vận chuyển nếu có) cho khách
              <strong>trong vòng 24h qua TÀI KHOẢN NGÂN HÀNG của khách </strong>
              (không tính Thứ 7, CN và ngày lễ) sau khi 9Egight đã nhận được
              hàng trả lại. Đồng thời, 9Eight sẽ
              <strong>
                đến tận nơi lấy hàng trả và không thu thêm bất cứ phí gì
              </strong>
              (Khách hàng cũng có thể tự gởi lại hàng cho 9Eight)
            </p>
            <p>
              <strong>3 Bước nhanh chóng để đổi trả:&nbsp;</strong>
            </p>
            <p>
              <strong>Bước 1:</strong> Điền thông tin đổi hàng ở{" "}
              <NavLink to="doi-hang" className="font-semibold">
                {" "}
                đây
              </NavLink>
              , và trả hàng ở
              <NavLink to="tra-hang" href="" className="font-semibold">
                {" "}
                đây
              </NavLink>
              , hoặc qua số hotline 09xxxxxxx.
            </p>
            <p>
              <strong>Bước 2:</strong> Nhận cuộc gọi xác nhận từ 9Eight về sản
              phẩm và thời gian nhận hàng
            </p>
            <p>
              <strong>Bước 3:</strong> Ngay khi xác nhận chúng tôi sẽ gởi bạn
              đơn hàng mới (hoặc lấy đơn hàng về), bạn chỉ cần gởi hàng cần
              đổi/trả cho shipper là được.
            </p>

            <p>
              <strong>Đối với việc trả hàng:</strong>
            </p>
            <p>
              Chúng tôi sẽ hoàn lại số tiền hàng (sau khi đã trừ 25.000 VNĐ phí
              ship hàng) vào tài khoản mà bạn cung cấp tối đa trong 24h làm việc
              (không tính thứ 7 &amp; Chủ Nhật) sau khi yêu cầu hoàn tiền được
              CSKH xác nhận.
            </p>
            <p>
              <strong>Lưu ý:</strong>
            </p>
            <p>&nbsp;⁃ 9Eight hỗ trợ đổi tối đa 3 lần/1 khách hàng.</p>
            <p>
              &nbsp;⁃ 9Eight có quyền quyết định dừng việc hỗ trợ đổi trả và trả
              lại tiền cho khách hàng nếu phát hiện khách hàng sử dụng chính
              sách để trục lợi (như việc đổi quá nhiều lần).
            </p>

            <p>
              <strong>Chúng tôi làm gì với hàng đổi trả:</strong>
            </p>
            <ul>
              <li>
                Sản phẩm đổi trả : thu gom và gởi cho các chương trình từ
                thiện&nbsp;
              </li>
              <li>Bít tất, boxer: huỷ bỏ 100%&nbsp;</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Request;
