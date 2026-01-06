import styles from './SettingsMenu.module.css';

interface SettingsMenuProps {
  isOpen: boolean;
  onToggleMenuClick: () => void;
  onCloseMenuClick: () => void;
  onTodayClick?: () => void;
  onSaveClick: () => void;
  onLoadClick: () => void;
}

export function SettingsMenu({
  isOpen,
  onToggleMenuClick,
  onCloseMenuClick,
  onTodayClick,
  onSaveClick,
  onLoadClick,
}: SettingsMenuProps) {
  return (
    <div className={styles.menuWrapper}>
      <button
        type="button"
        className={styles.toggleButton}
        onClick={onToggleMenuClick}
      >
        ⚙
      </button>
      {isOpen && (
        <>
          <div className={styles.overlay} onClick={onCloseMenuClick} />
          <div className={styles.menu}>
            {onTodayClick && (
              <button type="button" className={styles.menuItem} onClick={onTodayClick}>
                今日
              </button>
            )}
            <button type="button" className={styles.menuItem} onClick={onSaveClick}>
              保存
            </button>
            <button type="button" className={styles.menuItem} onClick={onLoadClick}>
              呼出
            </button>
          </div>
        </>
      )}
    </div>
  );
}
