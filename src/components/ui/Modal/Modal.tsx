import * as React from 'react';
import {
  Dialog,
  DialogTitle,
  Description,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';

import { Button } from '../Button';

interface IProps {
  isOpen: boolean;
  title: string;
  description: string;
  onClose: () => void;
  onConfirm: () => void;
}

export const Modal = ({
  isOpen,
  title,
  description,
  onClose,
  onConfirm,
}: IProps) => {
  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
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
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="relative w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  className="text-xl font-normal leading-6 text-gray-900 mb-4"
                >
                  {title}
                </DialogTitle>
                <Description className="text-gray-500 font-normal mb-6">
                  {description}
                </Description>
                <div className="flex justify-end gap-2">
                  <Button onClick={onClose} className="bg-white">
                    Cancel
                  </Button>
                  <Button onClick={onConfirm}>Confirm</Button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
