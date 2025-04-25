import * as React from 'react';
import {
  Dialog,
  DialogTitle,
  Description,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';

import CloseIcon from '@/assets/icons/close-icon.svg';
import { Button } from '../Button';
import { Loader } from '../Loader';

interface IProps {
  isOpen: boolean;
  title: React.ReactNode;
  description: React.ReactNode;
  onClose: () => void;
  onConfirm: () => void;
  confirmButtonTitle?: React.ReactNode;
  cancelButtonTitle?: React.ReactNode;
  confirmButtonWithArrow?: boolean;
  cancelButtonWithArrow?: boolean;
  loading?: boolean;
}

export const Modal = ({
  isOpen,
  title,
  description,
  onClose,
  onConfirm,
  confirmButtonTitle = 'Confirm',
  cancelButtonTitle = 'Cancel',
  confirmButtonWithArrow = false,
  cancelButtonWithArrow = false,
  children,
  loading = false,
}: React.PropsWithChildren<IProps>) => {
  const handleClose = () => {
    if (loading) return;

    onClose();
  };

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <TransitionChild
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/70" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center px-3">
            <TransitionChild
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="relative w-full max-w-[600px] transform overflow-hidden rounded-lg py-10 px-5 lg:px-8 shadow-xl transition-all grainy-background">
                {!loading && (
                  <button
                    onClick={handleClose}
                    className="absolute right-6 top-6 hover:opacity-80 transition-opacity cursor-pointer"
                    aria-label="Close modal"
                  >
                    <CloseIcon />
                  </button>
                )}
                <DialogTitle
                  as="h3"
                  className="text-center very-vogue-text text-[40px] leading-[90%] mb-2"
                >
                  {title}
                </DialogTitle>
                <Description className="text-center text-[20px] leading-[20px] font-[300] mb-5">
                  {description}
                </Description>
                {children}
                <div className="flex flex-col gap-4 lg:flex-row-reverse mt-6 lg:mt-8">
                  {loading ? (
                    <Loader />
                  ) : (
                    <>
                      <Button
                        className="h-[48px] rounded-4xl text-[16px] lg:w-full"
                        onClick={onConfirm}
                        withArrow={confirmButtonWithArrow}
                      >
                        {confirmButtonTitle}
                      </Button>
                      <Button
                        onClick={handleClose}
                        className="bg-transparent hover:bg-[var(--brand-coffee)] hover:opacity-100 h-[48px] rounded-4xl text-[16px] lg:w-full"
                        withArrow={cancelButtonWithArrow}
                      >
                        {cancelButtonTitle}
                      </Button>
                    </>
                  )}
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
