import Dropdown from 'components/Dropdown';
import styles from './menu.module.scss';

interface Props {
	onAddTodoClick: () => void;
	dropdownItems: Array<Record<string, any>>;
}
const Menu = ({ onAddTodoClick, dropdownItems }: Props) => {
	return (
		<div className={styles.menu}>
			<button onClick={onAddTodoClick} className='filled'>Add Todo</button>
			<Dropdown items={dropdownItems} />
		</div>
	);
};

export default Menu;
