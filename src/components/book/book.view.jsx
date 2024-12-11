import { Drawer } from "antd";

const BookView = (props) => {
   const {openDrawer, bookDetail,setopenDrawer} = props;
  
    const onClose = () => {
        setopenDrawer(false);
    };

    return (
        <Drawer
            style={{

            }}
            title="Book detail" onClose={onClose} open={openDrawer}>
            <p>Id: {bookDetail._id}</p>
            <p>Title: {bookDetail.mainText}</p>
            <p>Author: {bookDetail.author}</p>
            <p>Category: {bookDetail.category}</p>
            <p>Price: {bookDetail.price}</p>
            <p>Quantity: {bookDetail.quantity}</p>
            <p>Sold: {bookDetail.sold}</p>
            <p>Thumbnail : </p>
            <img
                style={{
                    marginTop: "10px",
                    height: '100px', width: '150px',
                    border: '1px solid #ccc'
                }}
                src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${bookDetail.thumbnail}`} alt="" />

        </Drawer>
    )
}

export default BookView;