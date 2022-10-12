import { useDispatch } from 'react-redux';
import { setShowType } from 'redux/slices/todoList';
import styles from './dropdown.module.scss';

interface Props {
	items: Array<Record<string, any>>;
}

const Dropdown = ({ items }: Props) => {
	const dispatch = useDispatch();
	const handleChange = (e: any) => {
		dispatch(setShowType(e.target.value));
	};
	return (
		<select className={styles.dropdown} onChange={handleChange}>
			{items.map((item, index) => (
				<option value={item.value} key={`option-${index}`}>
					{item.text}
				</option>
			))}
		</select>
	);
};

export default Dropdown;
