import { FileInput, Label, Modal, Pagination, Textarea, TextInput } from 'flowbite-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Button, Table } from 'flowbite-react';
import React from 'react';
import { PageProps } from '@/types';
import { toast } from 'react-toastify';

interface Book {
    book_id: number;
    title: string;
    author_id: number;
    category_id: number;
    price: number;
    isbn: string;
    description: string;
    image: string;
}

interface BooksData {
    data: Book[];
    current_page: number;
    last_page: number;
}

export default function Index({ books }: PageProps<{ books: BooksData }>) {
    const { errors } = usePage().props

    const [values, setValues] = React.useState({
        title: '',
        author_id: '',
        category_id: '',
        price: '',
        isbn: '',
        description: '',
        image: null as File | null,
    });
    const [openCreateModal, setOpenCreateModal] = React.useState(false);
    const [editBookId, setEditBookId] = React.useState<number | null>(null);
    const [deleteBookId, setDeleteBookId] = React.useState<number | null>(null);
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
    const [currentPage, setCurrentPage] = React.useState(books.current_page);
    const [totalPages, setTotalPages] = React.useState(books.last_page);

    function handleDeleteClick(bookId: number) {
        setDeleteBookId(bookId);
        setOpenDeleteModal(true);
    }

    function handleDeleteConfirm() {
        if (deleteBookId !== null) {
            router.delete(`/book/delete/${deleteBookId}`, {
                onSuccess: () => {
                    setOpenDeleteModal(false);
                    setDeleteBookId(null);
                    toast.success('Book deleted successfully!');
                }
            });
        }
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const key = e.target.id;
        const value = key === 'image' ? e.target.files?.[0] || null : e.target.value;

        setValues(values => ({
            ...values,
            [key]: value
        }));
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('author_id', values.author_id);
        formData.append('category_id', values.category_id);
        formData.append('price', values.price);
        formData.append('isbn', values.isbn);
        formData.append('description', values.description);
        if (values.image) {
            formData.append('image', values.image);
        }

        if (editBookId === null) {
            router.put('/book/create', formData, {
                onSuccess: () => {
                    setOpenCreateModal(false);
                    setValues({
                        title: '',
                        author_id: '',
                        category_id: '',
                        price: '',
                        isbn: '',
                        description: '',
                        image: null,
                    });
                    toast.success('Book added successfully!');
                }
            });
        } else {
            router.post(`/book/update/${editBookId}`, formData, {
                onSuccess: () => {
                    setOpenCreateModal(false);
                    setValues({
                        title: '',
                        author_id: '',
                        category_id: '',
                        price: '',
                        isbn: '',
                        description: '',
                        image: null,
                    });
                    setEditBookId(null);
                    toast.success('Book updated successfully!');
                }
            });
        }
    }

    function handleEditClick(book: Book) {
        setEditBookId(book.book_id);
        setValues({
            title: book.title,
            author_id: book.author_id.toString(),
            category_id: book.category_id.toString(),
            price: book.price.toString(),
            isbn: book.isbn,
            description: book.description,
            image: null,
        });
        setOpenCreateModal(true);
    }

    function handlePageChange(page: number) {
        setCurrentPage(page);
        // Fetch new data based on the page number
        router.get(`/categories?page=${page}`);
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl flex items-center justify-between font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Books List

                    <Button pill onClick={() => setOpenCreateModal(true)}>
                        Add Book
                    </Button>
                </h2>
            }
        >
            <Head title="Books" />

            {/* Create/Edit Book Modal */}
            <Modal show={openCreateModal} onClose={() => setOpenCreateModal(false)}>
                <Modal.Header>
                    {editBookId === null ? 'Add Book' : 'Edit Book'}
                </Modal.Header>

                <Modal.Body>
                    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor='title' value='Title' />
                            </div>
                            <TextInput id='title' placeholder='Ex: The Great Gatsby' value={values.title} onChange={handleChange} />
                            {errors.title && <div className='text-red-700'>{errors.title}</div>}
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor='author_id' value='Author ID' />
                            </div>
                            <TextInput id='author_id' placeholder='Ex: 1' value={values.author_id} onChange={handleChange} />
                            {errors.author_id && <div className='text-red-700'>{errors.author_id}</div>}
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor='category_id' value='Category ID' />
                            </div>
                            <TextInput id='category_id' placeholder='Ex: 1' value={values.category_id} onChange={handleChange} />
                            {errors.category_id && <div className='text-red-700'>{errors.category_id}</div>}
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor='price' value='Price' />
                            </div>
                            <TextInput id='price' placeholder='Ex: 19.99' value={values.price} onChange={handleChange} />
                            {errors.price && <div className='text-red-700'>{errors.price}</div>}
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor='isbn' value='ISBN' />
                            </div>
                            <TextInput id='isbn' placeholder='Ex: 978-3-16-148410-0' value={values.isbn} onChange={handleChange} />
                            {errors.isbn && <div className='text-red-700'>{errors.isbn}</div>}
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor='description' value='Description' />
                            </div>
                            <Textarea id='description' placeholder='Ex: A classic novel...' value={values.description} onChange={handleChange} className='form-textarea' />
                            {errors.description && <div className='text-red-700'>{errors.description}</div>}
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor='image' value='Upload book image' />
                            </div>
                            <FileInput id='image' onChange={handleChange} />
                            {errors.image && <div className='text-red-700'>{errors.image}</div>}
                        </div>

                        <Button type='submit'>{editBookId === null ? 'Save' : 'Update'}</Button>
                    </form>
                </Modal.Body>
            </Modal>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6">
                            <Table>
                                <Table.Head>
                                    <Table.HeadCell>ID</Table.HeadCell>
                                    <Table.HeadCell>Title</Table.HeadCell>
                                    <Table.HeadCell>Author ID</Table.HeadCell>
                                    <Table.HeadCell>Category ID</Table.HeadCell>
                                    <Table.HeadCell>Price</Table.HeadCell>
                                    <Table.HeadCell>ISBN</Table.HeadCell>
                                    <Table.HeadCell>Description</Table.HeadCell>
                                    <Table.HeadCell>Image</Table.HeadCell>
                                    <Table.HeadCell>Actions</Table.HeadCell>
                                </Table.Head>

                                <Table.Body className='divide-y'>
                                    {books.data.map((book) => (
                                        <Table.Row key={book.book_id}>
                                            <Table.Cell className='text-sm sm:text-xl'>{book.book_id}</Table.Cell>
                                            <Table.Cell className='text-sm sm:text-xl'>{book.title}</Table.Cell>
                                            <Table.Cell className='text-sm sm:text-xl'>{book.author_id}</Table.Cell>
                                            <Table.Cell className='text-sm sm:text-xl'>{book.category_id}</Table.Cell>
                                            <Table.Cell className='text-sm sm:text-xl'>{book.price}</Table.Cell>
                                            <Table.Cell className='text-sm sm:text-xl'>{book.isbn}</Table.Cell>
                                            <Table.Cell className='text-sm sm:text-xl'>{book.description}</Table.Cell>
                                            <Table.Cell className='text-sm sm:text-xl'>
                                                {book.image && <img src={`/storage/${book.image}`} alt={book.title} className='w-16 h-16 object-cover' />}
                                            </Table.Cell>
                                            <Table.Cell className='flex gap-2 sm:gap-4'>
                                                <button onClick={() => handleEditClick(book)} className='text-sm sm:text-xl font-medium text-cyan-600 hover:underline bg-transparent'>
                                                    Edit
                                                </button>

                                                {/* Delete Book Modal */}
                                                <Modal show={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
                                                    <Modal.Header>
                                                        Delete Category
                                                    </Modal.Header>

                                                    <Modal.Body>
                                                        <p>Are you sure you want to delete this category?</p>
                                                    </Modal.Body>

                                                    <Modal.Footer>
                                                        <Button onClick={() => setOpenDeleteModal(false)}>
                                                            Cancel
                                                        </Button>

                                                        <Button onClick={handleDeleteConfirm}>
                                                            Delete
                                                        </Button>
                                                    </Modal.Footer>
                                                </Modal>

                                                <button onClick={() => handleDeleteClick(book.book_id)} className='text-sm sm:text-xl font-medium text-red-600 hover:underline bg-transparent'>
                                                    Delete
                                                </button>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>

                            <Pagination 
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}