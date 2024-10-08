import { exists, OmitKeyof } from "@plainsheet/utility";
import {
  BottomSheetCore,
  createBottomSheet,
  createPlaceholderBottomSheet,
  BottomSheetCoreProps,
} from "@plainsheet/core";
export { createPlaceholderBottomSheet } from "@plainsheet/core";
export type { BottomSheetCore } from "@plainsheet/core";
import {
  forwardRef,
  ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

export type BottomSheetProps = {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  mountingPoint?: Element | null;
} & CoreProps;
type CoreProps = OmitKeyof<BottomSheetCoreProps, "content">;

const placeholderBottomSheet = createPlaceholderBottomSheet();

export const BottomSheet = forwardRef<BottomSheetCore, BottomSheetProps>(
  function InnerBottomSheet(props, refToExpose) {
    const {
      children,
      isOpen,
      setIsOpen,
      afterClose,
      mountingPoint,
      ...coreProps
    } = props;

    const bottomSheetRef = useRef<BottomSheetCore>(placeholderBottomSheet);
    const [bottomSheet, setBottomSheet] = useState<BottomSheetCore>(
      bottomSheetRef.current
    );
    useImperativeHandle(
      refToExpose,
      () => {
        return bottomSheet;
      },
      [bottomSheet]
    );

    const handleAfterClose = useCallback(() => {
      setIsOpen(false);
      afterClose?.();
    }, [afterClose]);
    useEffect(() => {
      if (isOpen) {
        bottomSheet.open();
      } else {
        bottomSheet.close();
      }
    }, [isOpen]);

    const bottomSheetContentsWrapperRef = useRef<HTMLElement | null>(null);
    useEffect(
      function initiateBottomSheet() {
        const mountingPoint = exists(props.mountingPoint)
          ? props.mountingPoint
          : window.document.body;
        if (!mountingPoint) {
          return;
        }
        if (bottomSheet.getIsMounted()) {
          return;
        }

        const bottomSheetInstance = createBottomSheet({
          content: "",
          ...coreProps,
          afterClose: handleAfterClose,
        });
        bottomSheetInstance.mount(mountingPoint);

        bottomSheetContentsWrapperRef.current =
          bottomSheetInstance.elements.bottomSheetContentWrapper ?? null;

        bottomSheetRef.current = bottomSheetInstance;
        setBottomSheet(bottomSheetInstance);

        return () => {
          bottomSheet.unmount();
        };
      },
      [props.mountingPoint, coreProps, handleAfterClose]
    );

    useEffect(
      function passPropsToCore() {
        Object.assign(bottomSheetRef.current.props, {
          ...coreProps,
        });
        setBottomSheet(bottomSheetRef.current);
      },
      [coreProps]
    );

    if (bottomSheetContentsWrapperRef.current) {
      // Attach the user-provided content to the bottom sheet
      return createPortal(
        props.children,
        bottomSheetContentsWrapperRef.current
      );
    }
    return null;
  }
);
