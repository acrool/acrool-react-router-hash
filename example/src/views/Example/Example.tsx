import {translateI18n, useLocale} from '@acrool/react-locale';
import {ELocales} from '../../config/locale';
import Table from "@acrool/react-table";




export const getTextNotComponent = () => {
    return translateI18n('page.home.desc');
};

const Example = () => {
    const {i18n, setLocale, locale} = useLocale();

    return <div>

        <select
            style={{padding: '5px', fontSize: '16px', borderRadius: '4px', marginBottom: '15px'}}
            onChange={(event) => setLocale((event.target.value) as ELocales)}
            value={locale}
        >
            <option>{ELocales.enUS}</option>
            <option>{ELocales.zhTW}</option>
            <option>{ELocales.jaJP}</option>
        </select>


        <Table
            isDark
            isVisiblePaginate={false}
            title={{
                title: {text: 'Title', col: 150},
                name: {text: 'Name', col: 'auto'}
            }}
            data={[
                {
                    id: 1,
                    field: {
                        title: 'in component',
                        name: i18n('page.home.desc'),
                    }
                },
                {
                    id: 2,
                    field: {
                        title: 'Not in component',
                        name: getTextNotComponent(),
                    }
                },
            ]}
        />
    </div>;
};


export default Example;
