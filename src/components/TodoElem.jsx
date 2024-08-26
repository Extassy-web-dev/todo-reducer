function TodoElem({ item, deleteFunc, change, toggle }) {

    return (
        <div className="todo-elem relative w-[300px] h-[105px] rounded-[10px] bg-[#f0f0f0] border-[1px] border-solid border-[#007FFF] p-[19px] max-w-full ">
            <img onClick={() => change(item?.id)}
                src={"../../edit.png"}
                className="absolute right-[45px] top-[16px] cursor-pointer hover:scale-[1.1] transition-all"
                alt="edit" />
            <img onClick={() => deleteFunc(item?.id)}
                src={"../cross.svg"}
                className='absolute right-[19px] top-[19px] w-[20px] cursor-pointer hover:scale-[1.1] transition-all'
                alt="delete" />
            <div className='flex flex-col gap-4'>
                <h3 onClick={() => toggle(item?.id)} className={item?.isCompleted ? 'active' : 'cursor-pointer w-[50px]'} >{item?.task}</h3>
                <i className='text-[rgba(0, 0, 0, 0.55)] font-[400]'>{new Date().getHours()}:{new Date().getMinutes()}</i>
            </div>
        </div>
    );
}

export default TodoElem;