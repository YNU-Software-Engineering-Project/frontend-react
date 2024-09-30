import style from 'styles/PostListPage/CheckBox.module.css';

type CheckboxProps = {
  title: string;
  description: string;
  checked: boolean;
  onChange: () => void;
};

const Checkbox: React.FC<CheckboxProps> = ({
  title,
  description,
  checked,
  onChange,
}) => {
  return (
    <>
      <div className={style.checkboxContainer}>
        <input
          className={style.checkbox}
          type="checkbox"
          id={title}
          checked={checked}
          onChange={onChange}
        />
        <label className={style.checkboxLabel}>
          <span className={style.checkboxTitle}>{title}</span>
          <span className={style.checkboxDescription}>{description}</span>
        </label>
      </div>
    </>
  );
};

export default Checkbox;
