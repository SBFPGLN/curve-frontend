import { useMemo } from 'react'
import { t } from '@lingui/macro'

import { formatNumber } from '@/ui/utils'
import useStore from '@/store/useStore'

import AlertBox from '@/ui/AlertBox'

const DetailsUserLoanAlertSoftLiquidation = ({ borrowed_token, collateral_token, userActiveKey }: PageContentProps) => {
  const userLoanDetails = useStore((state) => state.user.loansDetailsMapper[userActiveKey])

  // TODO handle error
  const { details } = userLoanDetails ?? {}

  const softLiquidationAmountText = useMemo(() => {
    let text = ''
    const { collateral = '0', borrowed = '0' } = details?.state ?? {}

    text += +collateral > 0 ? `${formatNumber(collateral)} ${collateral_token?.symbol}` : ''

    if (+borrowed > 0) {
      const borrowedText = `${formatNumber(borrowed)} ${borrowed_token?.symbol}`
      if (text) {
        text += ` and ${borrowedText}`
      } else {
        text += borrowedText
      }
    }

    return text
  }, [borrowed_token?.symbol, collateral_token?.symbol, details?.state])

  return (
    <AlertBox alertType="warning">
      {t`You are in soft-liquidation mode. The amount currently at risk is ${softLiquidationAmountText}. In this mode, you cannot partially withdraw or add more collateral to your position. To reduce the risk of hard liquidation, you can repay or, to exit soft liquidation, you can close (self-liquidate).`}
    </AlertBox>
  )
}

export default DetailsUserLoanAlertSoftLiquidation
