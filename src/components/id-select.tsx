/*
 * @Author: jessLiu
 */
import { Select } from "antd";
import React from "react";
import { Row } from "types";

type selectProps = React.ComponentProps<typeof Select>;

//omit用来删除继承对象中的某些key
interface IdSelectProps
  extends Omit<
    selectProps,
    "value" | "onChange" | "defaultOptionName" | "options"
  > {
  value?: Row | undefined | null;
  onChange?: (value?: number) => void;
  defaultOptionName?: string;
  options?: { name: string; id: number }[];
}
/**
 * value可以穿入多种类型的值，
 * onchange只会回调number|undefined类型
 * isNan（Number（value））为true代表选择默认类型，此事onchange回调undefined
 * @param props
 */
export const IdSelect = (props: IdSelectProps) => {
  const { value, onChange, defaultOptionName, options, ...restProps } = props;
  return (
    <Select
      value={options?.length ? toNumber(value) : 0}
      onChange={(value) => onChange?.(toNumber(value) || undefined)}
      {...restProps}
    >
      {defaultOptionName ? (
        <Select.Option value={0}>{defaultOptionName}</Select.Option>
      ) : null}
      {options?.map((option) => (
        <Select.Option value={option.id} key={option.id}>
          {option.name}
        </Select.Option>
      ))}
    </Select>
  );
};

const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value));
