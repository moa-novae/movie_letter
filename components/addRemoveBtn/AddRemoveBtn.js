import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { EuiButtonIcon } from "@elastic/eui";
import style from "./style.module.scss";
export default function ({
  handleFilterRuleAdd,
  handleFilterRuleDelete,
  canDeleteRule,
}) {
  return (
    <div className={style['add-btn-container']}>
      <EuiButtonIcon
        color="primary"
        iconType="plusInCircle"
        aria-label="Next"
        onClick={handleFilterRuleAdd}
      />
      <EuiButtonIcon
        color="primary"
        iconType="minusInCircle"
        aria-label="Next"
        onClick={handleFilterRuleDelete}
        disabled={!canDeleteRule}
      />
    </div>
  );
}
