import styles from './SettingsMenu.module.css';

interface SettingsMenuProps {
  type: 'start' | 'end';
  isOpen: boolean;
  onClose: () => void;
  onToday?: () => void;
  onSave: () => void;
  onLoad: () => void;
}

export function SettingsMenu({
  type,
  isOpen,
  onClose,
  onToday,
  onSave,
  onLoad,
}: SettingsMenuProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.menuContainer}>
      <div className={styles.menu}>
        {type === 'start' && onToday && (
          <button type="button" className={styles.menuButton} onClick={onToday}>
            今日
          </button>
        )}
        <button type="button" className={styles.menuButton} onClick={onSave}>
          保存
        </button>
        <button type="button" className={styles.menuButton} onClick={onLoad}>
          呼出
        </button>
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
        >
          ×
        </button>
      </div>
    </div>
  );
}
