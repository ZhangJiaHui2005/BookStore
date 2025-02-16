import { Label, Modal, TextInput } from 'flowbite-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Button, Table } from 'flowbite-react';
import React from 'react';
import { PageProps } from '@/types';
import { toast } from 'react-toastify';

interface Category {
    category_id: number;
    category_name: string;
}

export default function Index({ categories }: PageProps<{ categories: Category[] }>) {
    const [values, setValues] = React.useState({
        category_name: '',
    });
    const [openCreateModal, setOpenCreateModal] = React.useState(false);
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
    const [deleteCategoryId, setDeleteCategoryId] = React.useState<number | null>(null);
    const [editCategoryId, setEditCategoryId] = React.useState<number | null>(null);

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
        if (editCategoryId === null) {
            router.post('/categories/create', values, {
                onSuccess: () => {
                    setOpenCreateModal(false);
                    setValues({
                        category_name: '',
                    });
                    toast.success('Category added successfully!');
                }
            });
        } else {
            router.put(`/categories/update/${editCategoryId}`, values, {
                onSuccess: () => {
                    setOpenCreateModal(false);
                    setValues({
                        category_name: '',
                    });
                    setEditCategoryId(null);
                    toast.success('Category updated successfully!');
                }
            });
        }
    }

    function handleDeleteClick(categoryId: number) {
        setDeleteCategoryId(categoryId);
        setOpenDeleteModal(true);
    }

    function handleDeleteConfirm() {
        if (deleteCategoryId !== null) {
            router.delete(`/categories/delete/${deleteCategoryId}`, {
                onSuccess: () => {
                    setOpenDeleteModal(false);
                    setDeleteCategoryId(null);
                    toast.success('Category deleted successfully!');
                }
            });
        }
    }

    function handleEditClick(category: Category) {
        setEditCategoryId(category.category_id);
        setValues({
            category_name: category.category_name,
        });
        setOpenCreateModal(true);
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl flex items-center justify-between font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Categories List

                    <Button pill onClick={() => setOpenCreateModal(true)}>
                        Add Category
                    </Button>
                </h2>
            }
        >
            <Head title="Categories" />

            {/* Create/Edit Category Modal */}
            <Modal show={openCreateModal} onClose={() => setOpenCreateModal(false)}>
                <Modal.Header>
                    {editCategoryId === null ? 'Add Category' : 'Edit Category'}
                </Modal.Header>

                <Modal.Body>
                    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor='category_name' value='Name of category' />
                            </div>

                            <TextInput id='category_name' placeholder='Ex: Romance' value={values.category_name} onChange={handleChange} />
                        </div>

                        <Button type='submit'>{editCategoryId === null ? 'Save' : 'Update'}</Button>
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
                                    {categories.map((category) => (
                                        <Table.Row key={category.category_id}>
                                            <Table.Cell className='text-sm sm:text-xl'>{category.category_id}</Table.Cell>
                                            <Table.Cell className='text-sm sm:text-xl'>{category.category_name}</Table.Cell>
                                            <Table.Cell className='flex gap-2 sm:gap-4'>
                                                <button onClick={() => handleEditClick(category)} className='text-sm sm:text-xl font-medium text-cyan-600 hover:underline bg-transparent'>
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

                                                <button onClick={() => handleDeleteClick(category.category_id)} className='text-sm sm:text-xl font-medium text-red-600 hover:underline bg-transparent'>
                                                    Delete
                                                </button>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
