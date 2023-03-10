import cn from 'classnames';
import { ModalState } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeModalState } from '../../store/app-process/app-process';
import { getCamera } from '../../store/cameras-data/selectors';
import { Camera } from '../../types/types';
import ReviewModal from './review-modal';
import ReviewSuccess from './review-success';

type ModalProps = {
  modalState: string;
}

export default function Modal({modalState}: ModalProps): JSX.Element {
  const dispatch = useAppDispatch();

  const camera: Camera | undefined = useAppSelector(getCamera);

  const handleClickCloseButton = () => {
    dispatch(changeModalState(ModalState.Closed));
  };

  const handleEscPress = (evt: KeyboardEvent) => {
    if (evt.key === 'Esc' || evt.key === 'Escape') {
      dispatch(changeModalState(ModalState.Closed));
    }
  };

  document.addEventListener('keydown', handleEscPress);

  const getClassName = () => cn('modal is-active', {
    'modal--narrow': modalState === ModalState.ReviewSuccess
  });

  return (
    <div className={getClassName()} >
      <div className="modal__wrapper" data-testid="modal">
        <div className="modal__overlay" onClick={() => dispatch(changeModalState(ModalState.Closed))}></div>
        {modalState === ModalState.ReviewForm
            && camera
            && <ReviewModal cameraId={camera.id} onClick={handleClickCloseButton}/>}
        {modalState === ModalState.ReviewSuccess
            && <ReviewSuccess onClick={handleClickCloseButton}/>}
      </div>
    </div>
  );
}

