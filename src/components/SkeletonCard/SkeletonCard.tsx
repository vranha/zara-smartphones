import styles from './SkeletonCard.module.scss';

const SkeletonCard = () => {
  return (
    <div className={styles.skeletonCard}>
      <div className={`${styles.skeleton} ${styles.skeletonImage}`}></div>
      <div className={styles.skeletonContent}>
        <div className={`${styles.skeleton} ${styles.skeletonText} ${styles.skeletonBrand}`}></div>
        <div className={`${styles.skeleton} ${styles.skeletonText} ${styles.skeletonName}`}></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
