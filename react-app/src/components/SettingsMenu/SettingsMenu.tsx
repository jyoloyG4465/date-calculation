import styles from './SettingsMenu.module.css';

interface SettingsMenuProps {
  type: 'start' | 'end';
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  onToday?: () => void;
  onSave: () => void;
  onLoad: () => void;
}

export function SettingsMenu({
  type,
  isOpen,
  onToggle,
  onClose,
  onToday,
  onSave,
  onLoad,
}: SettingsMenuProps) {
  return (
    <div className={styles.menuWrapper}>
      <button
        type="button"
        className={styles.toggleButton}
        onClick={onToggle}
      >
        ⚙
      </button>
      {isOpen && (
        <>
          <div className={styles.overlay} onClick={onClose} />
          <div className={styles.menu}>
            {type === 'start' && onToday && (
              <button type="button" className={styles.menuItem} onClick={onToday}>
                今日
              </button>
            )}
            <button type="button" className={styles.menuItem} onClick={onSave}>
              保存
            </button>
            <button type="button" className={styles.menuItem} onClick={onLoad}>
              呼出
            </button>
          </div>
        </>
      )}
    </div>
  );
}
