import Authenticated from '@/Layouts/AuthenticatedLayout'
import { PageProps } from '@/types';
import { Head, router } from '@inertiajs/react'
import { Button, Label, Modal, Pagination, Table, TextInput } from 'flowbite-react'
import React from 'react'
import { toast } from 'react-toastify';

interface Author {
    author_id: number;
    name: string;
}

export default function Index({ authors }: PageProps<{ authors: Author[] }>) {
    const [values, setValues] = React.useState({
        name: ""
    })
    const [openCreateModal, setOpenCreateModal] = React.useState(false);
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
    const [deleteAuthorId, setDeleteAuthorId] = React.useState<number | null>(null);
    const [editAuthorId, setEditAuthorId] = React.useState<number | null>(null);
    const [currentPage, setCurrentPage] = React.useState(authors.current_page);
    const [totalPages, setTotalPages] = React.useState(authors.last_page);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const key = e.target.id;
        const value = e.target.value;

        setValues(values => ({
            ...values,
            [key]: value
        }));
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (editAuthorId === null) {
            router.post('/author/create', values, {
                onSuccess: () => {
                    setOpenCreateModal(false);
                    setValues({
                        name: '',
                    });
                    toast.success('Author added successfully!');
                }
            });
        } else {
            router.put(`/author/update/${editAuthorId}`, values, {
                onSuccess: () => {
                    setOpenCreateModal(false);
                    setValues({
                        name: '',
                    });
                    setEditAuthorId(null);
                    toast.success('Author updated successfully!');
                }
            });
        }
    }

    function handleDeleteClick(authorId: number) {
        setDeleteAuthorId(authorId);
        setOpenDeleteModal(true);
    }

    function handleDeleteConfirm() {
        if (deleteAuthorId !== null) {
            router.delete(`/author/delete/${deleteAuthorId}`, {
                onSuccess: () => {
                    setOpenDeleteModal(false);
                    setDeleteAuthorId(null);
                    toast.success('Author deleted successfully!');
                }
            });
        }
    }

    function handleEditClick(author: Author) {
        setEditAuthorId(author.author_id);
        setValues({
            name: author.name
        });
        setOpenCreateModal(true);
    }

    function handlePageChange(page: number) {
        setCurrentPage(page);
        // Fetch new data based on the page number
        router.get(`/categories?page=${page}`);
    }

    return (
        <Authenticated
            header={
                <h2 className="text-xl flex items-center justify-between font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Categories List

                    <Button pill onClick={() => setOpenCreateModal(true)}>
                        Add Author
                    </Button>
                </h2>
            }
        >
            <Head title='Authors' />

            {/* Create/Edit Category Modal */}
            <Modal show={openCreateModal} onClose={() => setOpenCreateModal(false)}>
                <Modal.Header>
                    {editAuthorId === null ? 'Add Author' : 'Edit Author'}
                </Modal.Header>

                <Modal.Body>
                    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor='category_name' value='Name of author' />
                            </div>

                            <TextInput id='name' placeholder='Ex: Zhang Jia Hui' value={values.name} onChange={handleChange} />
                        </div>

                        <Button type='submit'>{editAuthorId === null ? 'Save' : 'Update'}</Button>
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
                                    <Table.HeadCell>Name</Table.HeadCell>
                                    <Table.HeadCell>Actions</Table.HeadCell>
                                </Table.Head>

                                <Table.Body className='divide-y'>
                                    {authors.data.map((author) => (
                                        <Table.Row key={author.author_id}>
                                            <Table.Cell className='text-sm sm:text-xl'>{author.author_id}</Table.Cell>
                                            <Table.Cell className='text-sm sm:text-xl'>{author.name}</Table.Cell>
                                            <Table.Cell className='flex gap-2 sm:gap-4'>
                                                <button onClick={() => handleEditClick(author)} className='text-sm sm:text-xl font-medium text-cyan-600 hover:underline bg-transparent'>
                                                    Edit
                                                </button>

                                                {/* Delete Category Modal */}
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

                                                <button onClick={() => handleDeleteClick(author.author_id)} className='text-sm sm:text-xl font-medium text-red-600 hover:underline bg-transparent'>
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
        </Authenticated>
    )
}