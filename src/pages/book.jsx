import { useEffect, useState } from 'react';
import BookTable from '../components/book/book.table';
import { fetchAllBookAPI } from '../services/api.service';
import BookFormControl from '../components/book/book.form.control';
import BookFormUncontrol from '../components/book/book.form.uncontrol';

const BookPage = () => {
    // Book Table 
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(null);

    const [bookList, setBookList] = useState(
        []
    );

    useEffect(() => {
        loadBook()
    }, [current, pageSize])

    const loadBook = async () => {
        const res = await fetchAllBookAPI(current, pageSize);
        if (res.data && res.data.result) {
            const { current, pageSize, pages, total } = res.data.meta;
            setCurrent(current);
            setTotal(total)
            setBookList(res.data.result)
        }
    }



    return (
        <div>
            {/* <BookFormControl
            loadBook={loadBook}
            /> */}
            <BookFormUncontrol
            loadBook={loadBook}
            />
            <BookTable
                data={bookList}
                current={current}
                setCurrent={setCurrent}
                pageSize={pageSize}
                setPageSize={setPageSize}
                total={total}
                loadBook={loadBook}
            />



        </div>
    );
}

export default BookPage;