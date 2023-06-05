import { getZmaneiAyom } from '@src/lib/kosher-zmanim'
import ZmanimRepo from '@src/repos/ZmanimRepo'
import { ExtendedOptions } from '@src/types/kosher-zmanim'

// **** Functions **** //

/**
 * Get all zmanim.
 */
function getZmanim(options: ExtendedOptions) {
  const zmanim = getZmaneiAyom(options)
  return zmanim
}

// /**
//  * Get all zmanim.
//  */
// function getAll() {
//   return ZmanimRepo.getZmanim()
// }

// **** Export default **** //

export default {
  getZmanim,
} as const
