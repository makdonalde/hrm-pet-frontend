import { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/app/providers/StoreProvider/config/store';
import {
    useCreateCourseMutation, useGetCourseByIdMutation, useGetMyCoursesQuery, useUpdateCourseMutation,
} from '@/entities/Courses';
import { Course } from '@/entities/Courses/model/types/course';
import { CourseCard } from '@/entities/Courses/ui/CourseCard/CourseCard';
import { CoursesList } from '@/entities/Courses/ui/CoursesList/CourseList';
import { CreateCourseCard } from '@/entities/Courses/ui/CreateCourseCard/CreateCourseCard';
import { Button, Modal } from '@/shared/ui';
import { Typography } from '@/shared/ui/micro-components/micro-components';

const StyledWrapperModal = styled.div`
    background-color: ${({ theme }) => theme.bgColors.primaryColor} !important;
    color: ${({ theme }) => theme.colors.primaryColor} ;
    
`;
export function UserCourseList() {
    const userId = useAppSelector((state) => state.userReducer.user?.id);
    const { t } = useTranslation();
    const [courseMutation, { data: course, isLoading: isCourseLoading }] = useGetCourseByIdMutation();
    const [createCourseMutation, { isLoading: isCourseCreateLoading }] = useCreateCourseMutation();

    const [updateCourse, { isLoading: isUpdateCourseLoading }] = useUpdateCourseMutation();

    const [currentPage, setCurrentPage] = useState(1);
    const [isOpen, setIsOpen] = useState(false);

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
    };

    const {
        data, isLoading,
    } = useGetMyCoursesQuery(currentPage);

    const closeCreateModal = () => {
        setIsCreateModalOpen(false);
    };

    const onItemSaved = (item:Partial<Course> & {courseCategoryId:number}) => {
        setIsCreateModalOpen(false);

        createCourseMutation({
            userId: userId!,
            ...item,
        });
    };

    const onItemSave = (course:Partial<Course>) => {
        setIsOpen(false);

        updateCourse({
            ...course,
            courseCategory:
            course.courseCategory && Number.isNaN(+course.courseCategory) ? undefined : course.courseCategory,
        });
    };
    const onItemSelect = (courseId:number) => {
        courseMutation(courseId).unwrap().then(() => {
            setIsOpen(true);
        });
    };

    return (
        <>
            <Modal isOpen={isCreateModalOpen} setClose={closeCreateModal}>
                <StyledWrapperModal>
                    <CreateCourseCard onClose={() => setIsCreateModalOpen(false)} onItemSaved={onItemSaved} />
                </StyledWrapperModal>
            </Modal>

            <Modal isOpen={isOpen} setClose={closeModal}>
                <StyledWrapperModal>

                    {isCourseLoading ? (
                        <Typography>
                            {t('loading')}
                        </Typography>
                    ) : (
                        <CourseCard
                            isLoading={isCourseLoading}
                            onSave={onItemSave}
                            onClose={() => setIsOpen(false)}
                            course={course!}
                        />
                    )}
                </StyledWrapperModal>
            </Modal>

            <CoursesList
                currentPage={currentPage}
                data={data?.data}
                isLoading={isLoading || isCourseCreateLoading || isUpdateCourseLoading}
                onCourseSelected={onItemSelect}
                totalPages={data?.totalPages}
                handlePageChange={(page) => setCurrentPage(page)}

            />
            <Button onClick={() => { setIsCreateModalOpen(true); }}>{t('add')}</Button>

        </>
    );
}
