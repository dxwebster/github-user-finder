# Primeiros códigos

Como nosso aplicativo consiste no cadastro de usuários e agendamentos de um horário com um cabeleireiro (providers), temos então basicamente duas entidades: agendamentos e usuários.

Vamos começar lidando com os agendamentos. Podemos dividir o desenvolvimento em 5 partes:

* **1. Tabela de agendamentos:** a tabela terá 5 colunas
  * id do agendamento
  * id do provider
  * data do agendamento
  * data de criação
  * data de atualização
* **2. Model de agendamentos:** os dados de agendamento terão os seguintes formatos:
  * id do agendamento (chave primária)
  * id do provider (chave estrangeira que vai se relacionar com a tabela de users)
  * data do agendamento (Date)
  * data de criação (Date)
  * data de atualização (Date)
* **3. Repositório de agendamentos:**
  * procurar no banco de dados agendamentos com a data selecionada
  * retornar o agendamento
* **4. Service de agendamentos:**
  * verificar se já existe algum agendamento com a data selecionada
  * permite ou não o agendamento
* **5. Rotas de agendamentos:** teremos duas principais rotas:
  * criar um novo agendamento
  * listar todos os agendamentos

## 1. Criação da Tabela de Agendamentos

Vamos criar a primeira migration que vai ser responsável pela criação da tabela de agendamentos (appointments) no banco de dados. O comando abaixo vai criar o arquivo 'CreateAppointments.ts' na pasta 'migrations'.

`yarn typeorm migration:create -n CreateAppointments`

Essa migration 'CreateAppointments' terá a seguinte estrutura: o 'up()' para criar a tabela e o 'down(), que exclui essa mesma tabela, caso for necessário. Na primeira linha, já temos a importação dos os métodos do TypeORM que permitem a execução da migration e acrescentaremos o método 'Table' para criação da tabela. Em seguida utilizamos a função queryRunner() que vai rodar a query que executará a criação da tabela. Dentro dessas funções vamos escrever cada coluna da tabela e suas características.

```ts
import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateAppointments1594855599794 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'appointments',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'provider_id',
                        type: 'varchar',
                    },
                    {
                        name: 'date',
                        type: 'timestamp with time zone',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('appointments');
    }

}
```

Agora, para executar a migration e a criação da nossa tabela no banco de dados, vamos executar o comando: `yarn typeorm migration:run`. Assim que finalizar, o terminal vai exibir as querys que foram executadas, como o exemplo abaixo:

![](https://ik.imagekit.io/dxwebster/Untitled\_\_2\_\_Yg5VpH3Yiq.png)

Quando abrimos o banco de dados, teremos nossa tabela 'appointments' criada e também uma tabela 'migrations' com nosso histórico de criação de migrations.

### 2. Criação do Model do Agendamentos

Dentro da pasta 'src' criar uma pasta 'models' e um arquivo chamado Appointment.ts. O model ou entidade da aplicação é o lugar que vamos setar o formato de um dado que será armazenado no banco de dados. Ou seja, nessa aplicação, o model de Appointment é nada mais nada menos que o formato que todo agendamento terá no banco de dados.

Nas primeiras linhas, vamos importar os métodos do typeorm que informam que essa model está relacionada a uma tabela do banco de dados. Depois logo abaixo, vamos informar os formato de cada coluna da tabela 'appointments'.

```ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import User from './User';

@Entity('appointments') // indica que o model vai ser armazenado dentro da tabela 'appointments'
class Appointment {
   
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    provider_id: string;

    @ManyToOne(() => User) // muitos agendamentos para um único usuário
    @JoinColumn({ name: 'provider_id' }) // qual a coluna que vai identicar o prestador desse agendamento
    provider: User;

    @Column('timestamp with time zone')
    date: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}

export default Appointment;
```

### 3. Criação do Repositório de Agendamentos

Dentro da pasta src, vamos criar uma pasta 'repositories' e um arquivo 'AppointmentsRepository.ts'. O Repositório, nessa aplicação, pode ser definido como uma conexão do banco de dados e as rotas de agendamento. Com a utilização do TypeORM, já temos alguns métodos padrão que usamos para manipular o banco de dados, como por exemplo: 'create()', 'list()', 'remove()', 'update()', entre outros (consultar métodos de Repository). Entretanto, podemos criar nosso próprios métodos para atender às necessidades da nossa aplicação.

Na nossa aplicação, além de criar, listar ou remover agendamentos, precisamos de um método que possa encontrar no banco de dados um agendamento pela data. Assim, criaremos o método findByDate().

Nas primeiras linhas, vamos importar os métodos do typeorm que vamos utilizar e também o model Appointment que já criamos anteriormente. Logo abaixo, criaremos o repositório com nosso novo método 'findByDate()'.

```ts
import { EntityRepository, Repository } from 'typeorm';
import Appointment from '../models/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment>{
    public async findByDate(date: Date): Promise<Appointment | null> {
        const findAppointment =  await this.findOne({
            where: { date },
        });
        
        return findAppointment || null; // retorna o que encontrou ou retorna nulo
    }
}

export default AppointmentsRepository;
```

### 4. Criação do Service de Agendamentos

Na pasta 'src' criar uma pasta 'services' e um arquivo 'CreateAppointmentService.ts'. O service vai armazenar a regra de negócio da aplicação. No caso dessa aplicação, o service 'CreateAppointmentService' se encarregará de verificar se já existe algum agendamento na data selecionada e retornar uma resposta. Caso já tenha, vai retornar um "erro" com a mensagem 'This appointmnet is already booked', caso não tenha, permitirá que o agendamento prossiga e seja salvo no banco de dados.

Nas primeiras linhas, importaremos o 'date-fns' para lidar com as datas e o método de repositório do typeorm. O método 'startOfHour()' formata a hora para deixar sem minutos ou segundos.

```ts
import { startOfHour } from 'date-fns'; // importa os métodos para lidar com datas
import { getCustomRepository } from 'typeorm'; // importa o método de repositório customizado
```

Logo abaixo, vamos importar \[...], o model e o repositório de Agendamentos.

```ts
import AppError from '../errors/AppError';
import Appointment from '../models/Appointment'; // importa o model de appointment
import AppointmentsRepository from '../repositories/AppointmentsRepository'; // importa o repositório de appointment
```

Vamos criar um DTO \[...]???

```ts
interface RequestDTO {
    provider_id: string;
    date: Date;
}
```

O service é criado por meio de classe por meio do método publico 'execute()', que nesse caso significa a criação de um novo agendamento. O 'execute()' recebe dois parâmetros, a 'data selecionada' e o 'provider\_id'. Dentro do execute, colocaremos a regra de criação do agendamento, ou seja, só pode ocorrer um novo agendamento se não houver nenhum outro agendamento no mesmo horário. E para isso, utilizaremos nosso método 'findByDate()' criado no 'AppointmentsRepository'.

```ts
class CreateAppointmentService {
    public async execute({ date, provider_id }: RequestDTO): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(AppointmentsRepository);

        const appointmentDate = startOfHour(date); 

        const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate); //verifica se já tem um appointment na mesma data
        if (findAppointmentInSameDate){ // se encontrar o appointment na mesma data de um já existente retorna erro
            throw new AppError('This appointmnet is already booked');
        }

        const appointment = appointmentsRepository.create({ provider_id, date: appointmentDate }); // cria um novo appointment
        await appointmentsRepository.save(appointment); // salva o registro no banco de dados

        return appointment; // retorna o appointment feito
    }
}

export default CreateAppointmentService; // exporta o service de appointment
```

### 5. Criação de Rotas de Agendamentos

Criar uma pasta 'routes' e dentro dela vamos criar a primeira rota para agendamento (appointments) de horários no cabeleireiro. Nosso arquivo de rota para agendamentos chamará 'appointments.routes.ts'. Os arquivos de rotas são responsáveis por receber a requisição, chamar outro arquivo para tratar a requisição e após isso devolver uma resposta.

Para lidar com datas e horários, vamos instalar uma dependência chamada date-fns: `yarn date-fns`. Com o método parseISO() o date-fns converte uma string enviada pelo json, para um formato date() nativo do javascript.

As primeiras linhas, faremos as importações de dependências:

```ts
import { parseISO } from 'date-fns'; // importa os métodos para lidar com datas
import { Router } from 'express'; // importa as rotas do express
import { getCustomRepository } from 'typeorm'; // importa o custom repository do typeorm
```

Logo abaixo, importaremos os arquivos de Repositório e Service que criamos para os agendamentos e a middleware de Autenticação.

```ts
import AppointmentsRepository from '../repositories/AppointmentsRepository'; // importa o Repositorio de appointments
import CreateAppointmentService from '../services/CreateAppointmentService'; // importa o Service de appointments
import ensureAuthenticated from '../middlewares/ensureAuthenticated'; // importa  a Autenticação do JWT token
```

Depois armazenamos em uma variável o método de rotas e incluímos o middleware de autenticação que será usada em todas as rotas de agendamento seguintes.

```ts
const appointmentsRouter = Router(); // variável que vai conter o método de rotas
appointmentsRouter.use(ensureAuthenticated); //  middleware de autenticação 
```

Feito isso, vamos criar duas rotas, a que lista os agendamentos, e a que cria novos agendamentos. Primeiro temos a rota para listar os agendamentos, que utiliza o método get(). Com a função find() eu busco no repositório os agendamentos e retorno.

```ts
// Rota que lista os appointments
appointmentsRouter.get('/', async (request, response) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    
    // faço a busca utilizando o repositório
    const appointments = await appointmentsRepository.find();
    
    // retorno a lista de agendamentos
    return response.json(appointments);
});
```

Na rota de criação de agendamentos, utilizamos o método post(). Podemos notar que utilizamos um método parseISO para transformar a data em um formato nativo do js. Como esse método apenas transforma os dados, não há problema em deixá-lo aqui dentro da rota. Essa rota pega os dados do corpo da requisição com o request.body, depois converte a data em formato .js e logo abaixo já executamos o service (regra de negócio) pela função execute(). O retorno é o agendamento criado.

```ts
// Rota que cria novos appointments
appointmentsRouter.post('/', async (request, response) => {
    
    // dados do corpo da requisição
    const { provider_id, date } = request.body;
    
    //conversão da data de json para .js
    const parsedDate = parseISO(date); 
    
    // execução da regra de negócio (service)
    const createAppointment = new CreateAppointmentService();     
    const appointment = await createAppointment.execute({
        date: parsedDate,
        provider_id,
    }); 

    // retorna o appointment criado
    return response.json(appointment);
});
```

E no final, exportamos as rotas

```ts
export default appointmentsRouter; 
```
