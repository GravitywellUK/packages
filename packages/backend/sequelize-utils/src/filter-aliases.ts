import * as Sequelize from "sequelize";
import * as R from "ramda";

/**
 * Types that can be used in filters.
 *
 * These types have been mainly infered from Sequelize types
 * WhereOptions => FiltersOptions, WhereAttributeHash => FiltersAttributeHash, etc
 */
export type FiltersOptions<TAttributes = any> =
  | FiltersAttributeHash<TAttributes>
  | AndOperator<TAttributes>
  | OrOperator<TAttributes>;

export type FiltersAttributeHash<TAttributes = any> = {
  [field in keyof TAttributes]: FiltersValue<TAttributes> | FiltersOptions<TAttributes>;
};

export type FiltersValue<TAttributes = any> =
  | string // literal value
  | number // literal value
  | boolean // literal value
  | Date // literal value
  | Buffer // literal value
  | null
  | FiltersOperators
  | FiltersAttributeHash<any> // for JSON columns
  | OrOperator<TAttributes>
  | AndOperator<TAttributes>;

export interface OrOperator<TAttributes = any> {
  $or: FiltersOptions<TAttributes> | Array<FiltersOptions<TAttributes>> | FiltersValue<TAttributes> | Array<FiltersValue<TAttributes>>;
}

export interface AndOperator<TAttributes = any> {
  $and: FiltersOptions<TAttributes> | Array<FiltersOptions<TAttributes>> | FiltersValue<TAttributes> | Array<FiltersValue<TAttributes>>;
}

export interface FiltersOperators {
  $any: Array<string | number>;
  $gte: number | string | Date;
  $lt: number | string | Date;
  $lte: number | string | Date;
  $ne: null | string | number | FiltersOperators;
  $not: null | boolean | string | number | FiltersOperators;
  $between: Rangable;
  $in: Array<string | number>;
  $notIn: Array<string | number>;
  $like: string | FiltersOperators["$any"] | FiltersOperators["$all"];
  $notLike: string | FiltersOperators["$any"] | FiltersOperators["$all"];
  $iLike: string | FiltersOperators["$any"] | FiltersOperators["$all"];
  $overlap: Rangable;
  $contains: Array<string | number> | Rangable;
  $contained: Array<string | number> | Rangable;
  $gt: number | string | Date;
  $notILike: string | FiltersOperators["$any"] | FiltersOperators["$all"];
  $notBetween: Rangable;
  $startsWith: string;
  $endsWith: string;
  $substring: string;
  $regexp: string;
  $notRegexp: string;
  $iRegexp: string;
  $notIRegexp: string;
  $strictLeft: Rangable;
  $strictRight: Rangable;
  $noExtendLeft: Rangable;
  $noExtendRight: Rangable;
  $all: Array<string | number | Date>;
}

export type Rangable = [number, number] | [Date, Date];

const filterAliases = {
  $eq: Sequelize.Op.eq,
  $ne: Sequelize.Op.ne,
  $gte: Sequelize.Op.gte,
  $gt: Sequelize.Op.gt,
  $lte: Sequelize.Op.lte,
  $lt: Sequelize.Op.lt,
  $not: Sequelize.Op.not,
  $in: Sequelize.Op.in,
  $notIn: Sequelize.Op.notIn,
  $is: Sequelize.Op.is,
  $like: Sequelize.Op.like,
  $notLike: Sequelize.Op.notLike,
  $iLike: Sequelize.Op.iLike,
  $notILike: Sequelize.Op.notILike,
  $regexp: Sequelize.Op.regexp,
  $notRegexp: Sequelize.Op.notRegexp,
  $iRegexp: Sequelize.Op.iRegexp,
  $notIRegexp: Sequelize.Op.notIRegexp,
  $between: Sequelize.Op.between,
  $notBetween: Sequelize.Op.notBetween,
  $overlap: Sequelize.Op.overlap,
  $contains: Sequelize.Op.contains,
  $contained: Sequelize.Op.contained,
  $strictLeft: Sequelize.Op.strictLeft,
  $strictRight: Sequelize.Op.strictRight,
  $noExtendRight: Sequelize.Op.noExtendRight,
  $noExtendLeft: Sequelize.Op.noExtendLeft,
  $and: Sequelize.Op.and,
  $or: Sequelize.Op.or,
  $any: Sequelize.Op.any,
  $all: Sequelize.Op.all
};

/**
 * Convert filters (relying on aliases) to use Sequelize operators.
 *
 * @param filters
 */
export const convertAliasesToOperators = <TAttributes>(filters: FiltersOptions<TAttributes>): Sequelize.WhereOptions<TAttributes> => {
  const convertedFilters: Sequelize.WhereOptions = {};
  let destKey;
  let value;

  for (const key in filters) {
    // Transform the operator when detected.
    destKey = R.find((alias: string) => alias === key, Object.keys(filterAliases)) ? filterAliases[ key as keyof FiltersOptions ] : key;
    value = filters[ key as keyof typeof filters ];

    // If the value is an object, recurse.
    if (typeof value === "object") {
      value = convertAliasesToOperators(value);
    }

    // Set it on the result using the destination key
    convertedFilters[ destKey ] = value;
  }

  return convertedFilters;
};