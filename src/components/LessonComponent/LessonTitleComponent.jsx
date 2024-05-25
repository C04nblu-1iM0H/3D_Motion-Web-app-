import { usePathname } from "next/navigation"

export default function LessonTitleComponent({id}) {
    const pathname = usePathname();
    return(
        <>
            {pathname === `/setting_course/view_courses/${id}` && (
                <h2 className="pb-3">Ниже кратко представлена ифнформация о курсах, которые вы создали</h2>
            )}
            {pathname === `/setting_course/update_courses/${id}` && (
                <h2 className="pb-3">Ниже представлены все уроки этого кусра, вы можете обновить их кликнув по кнопке в таблице</h2>
            )}
            {pathname === `/setting_course/delete_courses/${id}` && (
                <h2 className="pb-3">Ниже представлены все уроки этого кусра, вы можете удалить их кликнув по кнопке в таблице</h2>
            )}
        </>

    )
}